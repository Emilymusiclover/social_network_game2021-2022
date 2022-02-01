using System.Threading;
using System.Threading.Tasks;
using AppSite.Domain.Users;
using AppSite.Domain.Connections;
using AppSite.Domain.ConnectionRequests;
using AppSite.Domain.IntroductionRequests;
using AppSite.Infrastructure;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;


namespace AppSite
{
    public class Bootstrap : IHostedService
    {
        private readonly IServiceScopeFactory _scopeFactory;

        public Bootstrap(IServiceScopeFactory scopeFactory)
        {
            _scopeFactory = scopeFactory;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            // create scope
            using var scope = _scopeFactory.CreateScope();
            // get dbContext
            var context = scope.ServiceProvider.GetRequiredService<AppSiteContext>();
            // create & save user
            var user = new User(new Email("admin@email.com"), new Password("Admin!54321"));
            context.Add(user);
            // create & save user 1
            var user2 = new User(new Email("user1@email.com"), new Password("User1!54321"));
            context.Add(user2);
            // create & save user 2
            var user3 = new User(new Email("user2@email.com"), new Password("User2!54321"));
            context.Add(user3);
            // create connection between admin and user 1
            var connection1 = new Connection(new ConnectionId(Guid.NewGuid()), user.Id, user2.Id,
                new RelationshipStrength(3), new RelationshipStrength(4), new BondValue(6));
            context.Add(connection1);
            // create connection between user 1 and user2
            var connection2 = new Connection(new ConnectionId(Guid.NewGuid()), user2.Id, user3.Id,
                new RelationshipStrength(3), new RelationshipStrength(4), new BondValue(6));
            context.Add(connection2);
            // create connection between admin and user 2
            var connection3 = new Connection(new ConnectionId(Guid.NewGuid()), user.Id, user3.Id,
                new RelationshipStrength(3), new RelationshipStrength(4), new BondValue(6));
            context.Add(connection3);
            // create pendent introduction request
            var introductionRequest = new IntroductionRequest(IntroductionState.pendent, user3, user, user2,
                new IntroductionText("Olá, por favor, introduz-me ao user"),
                new ConnectionText("Olá user, gostava muito de fazer parte dos teus amigos"));
            context.Add(introductionRequest);
            var introductionRequest2 = new IntroductionRequest(IntroductionState.pendent, user2, user, user3,
                new IntroductionText("Olá, introduz-me por favor"), new ConnectionText("Olá, vamos ser amigos?"));
            context.Add(introductionRequest2);
            // create pendent connection request
            var connectionRequest =
                new ConnectionRequest(ConnectionState.pendent, user2, user, new ConnectionText("Olá"));
            context.Add(connectionRequest);
            var connectionRequest2 =
                new ConnectionRequest(ConnectionState.pendent, user3, user, new ConnectionText("Olá"));
            context.Add(connectionRequest2);
            // save changes
            await context.SaveChangesAsync(cancellationToken);
        }

        public Task StopAsync(CancellationToken cancellationToken) => null;
    }
}