using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AppSite.Domain.Ai;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.EntityFrameworkCore;
using AppSite.Domain.Shared;
using AppSite.Infrastructure;
using AppSite.Infrastructure.Shared;
using AppSite.Domain.Tags;
using AppSite.Infrastructure.Tags;
using AppSite.Domain.Users;
using AppSite.Infrastructure.Users;
using AppSite.Domain.Connections;
using AppSite.Infrastructure.Connections;
using AppSite.Domain.IntroductionRequests;
using AppSite.Infrastructure.IntroductionRequests;
using AppSite.Domain.ConnectionRequests;
using AppSite.Infrastructure.ConnectionRequests;
using AppSite.Domain.Networks;
using AppSite.Domain.EmotionalStates;

namespace AppSite
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // enables swagger ui
            services.AddControllers();
            services.AddSwaggerGen(c => { c.SwaggerDoc("v1", new OpenApiInfo {Title = "AppSite", Version = "v1"}); });
            services.AddControllers().AddNewtonsoftJson();

            // basic auth
            services.AddAuthentication("BasicAuthentication")
                .AddScheme<AuthenticationSchemeOptions, BasicAuthenticationHandler>("BasicAuthentication", null);

            // database service
            var dbConfig = Configuration.GetValue<string>("Database");

            switch (dbConfig)
            {
                case "InMemory":
                    services.AddDbContext<AppSiteContext>(opt =>
                        opt.UseInMemoryDatabase("AppSite")
                            .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());
                    break;
                case "Local":
                    services.AddDbContext<AppSiteContext>(opt =>
                        opt.UseSqlServer(Configuration.GetConnectionString("LocalSettings"),
                                sqlOptions => sqlOptions.EnableRetryOnFailure(5, TimeSpan.FromSeconds(10), null))
                            .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>());
                    break;
                case "Remote":
                    Console.Error.WriteLine("Remote Database Configuration Unavailable");
                    break;
                default:
                    Console.Error.WriteLine("Invalid Database Configuration");
                    break;
            }

            // user
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<UserService>();
            // user profile
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IUserProfileRepository, UserProfileRepository>();
            services.AddTransient<UserProfileService>();

            // tags
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<ITagRepository, TagRepository>();
            services.AddTransient<TagService>();

            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<ITagCloudRepository, TagCloudRepository>();
            services.AddTransient<TagCloudService>();

            // connections
            // singleton vs transient vs scoped
            services.AddTransient<IConnectionRepository, ConnectionRepository>();
            services.AddTransient<ConnectionsService>();

            // networks
            // explicit instantiation (for now)
            services.AddScoped<NetworksService>();

            // ai
            services.AddScoped<AiService>();

            // emotional states
            services.AddTransient<EmotionalStatesService>();

            // introduction Requests
            services.AddTransient<IIntroductionRequestRepository, IntroductionRequestRepository>();
            services.AddTransient<IntroductionRequestService>();

            // connection Request
            services.AddTransient<IConnectionRequestRepository, ConnectionRequestRepository>();
            services.AddTransient<ConnectionRequestService>();

            // bootstrap service
            services.AddHostedService<Bootstrap>();

            services.AddCors(options => options.AddPolicy("ApiCorsPolicy",
                builder =>
                {
                    builder.WithOrigins("http://localhost:3000").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
                }));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AppSite v1"));
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors("ApiCorsPolicy");
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
    }
}