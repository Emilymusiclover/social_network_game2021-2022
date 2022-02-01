using System.Net.Http;
using AppSite;
using AppSite.Infrastructure;
using AppSite.Infrastructure.Shared;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace AppSiteTests
{
    public class IntegrationTest
    {
        protected readonly HttpClient _client;

        protected IntegrationTest()
        {
            // create client
            // var appFactory = new WebApplicationFactory<Startup>();
            // .WithWebHostBuilder(
            //     builder => builder.ConfigureServices(
            //         services => services.AddDbContext<AppSiteContext>(opt =>
            //             opt.UseInMemoryDatabase("AppSite")
            //                 .ReplaceService<IValueConverterSelector, StronglyEntityIdValueConverterSelector>())
            //     )
            // );
            // _client = appFactory.CreateClient();
            _client = null;
        }
    }
}