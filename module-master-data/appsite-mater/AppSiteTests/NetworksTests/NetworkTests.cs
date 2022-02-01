using System;
using System.Linq;
using System.Text;
using AppSite.Domain.Connections;
using AppSite.Domain.Networks;
using AppSite.Domain.Users;
using Xunit;
using Moq;
using Xunit.Abstractions;

namespace AppSiteTests.NetworksTests
{
    public class NetworkTests
    {
        private static UserId GenerateUserId(int num)
        {
            var str = num.ToString();
            while (str.Length < 8)
                str = str.Insert(0, "0");

            var guid = $"{str}-0000-0000-0000-000000000000";
            return new UserId(guid);
        }

        private readonly ITestOutputHelper _output;
        private readonly Network _network;

        public NetworkTests(ITestOutputHelper output)
        {
            _output = output;
            
            /*
            *    graph structure
            *
            *    center = 1
            *    
            *    ids     -   strengths
            *    1,2         10,20
            *    1,3         10,30
            *    1,4         20,50
            *    
            *    2,3         25,25
            *    2,5         40,30
            *    
            *    3,4         80,85
            */

            // create network
            Network network = new(GenerateUserId(1), new MapGraph<UserId>());

            // create vertices
            network.AddUser(GenerateUserId(5));
            network.AddUser(GenerateUserId(6));

            // create edges
            network.AddConnection(new Connection(
                GenerateUserId(1),
                GenerateUserId(2),
                new RelationshipStrength(10),
                new RelationshipStrength(20))
            );
            network.AddConnection(new Connection(
                GenerateUserId(1),
                GenerateUserId(3),
                new RelationshipStrength(10),
                new RelationshipStrength(30))
            );
            network.AddConnection(new Connection(
                GenerateUserId(1),
                GenerateUserId(4),
                new RelationshipStrength(20),
                new RelationshipStrength(50))
            );

            network.AddConnection(new Connection(
                GenerateUserId(2),
                GenerateUserId(3),
                new RelationshipStrength(25),
                new RelationshipStrength(25))
            );
            network.AddConnection(new Connection(
                GenerateUserId(2),
                GenerateUserId(5),
                new RelationshipStrength(40),
                new RelationshipStrength(30))
            );

            network.AddConnection(new Connection(
                GenerateUserId(3),
                GenerateUserId(4),
                new RelationshipStrength(80),
                new RelationshipStrength(85))
            );

            _network = network;
        }

        [Fact]
        public void GetAllUsers_6Users_ReturnsUserIds()
        {
            _output.WriteLine("GetAllUsers_6Users_ReturnsUserIds");
            // Arrange
            var network = _network;

            // Act
            var users = network.GetAllUserIds();

            // Assert
            Assert.NotNull(users);
            users.ForEach(id => _output.WriteLine(id.AsString()));
            Assert.Equal(6, users.Count);
        }

        [Fact]
        public void HasUser_ValidIds_ReturnsTrue()
        {
            _output.WriteLine("HasUser_ValidId_ReturnsTrue");
            // Arrange
            var network = _network;

            // Act
            var hasUser1 = network.HasUser(GenerateUserId(1));
            var hasUser3 = network.HasUser(GenerateUserId(3));
            var hasUser5 = network.HasUser(GenerateUserId(4));

            // Assert
            Assert.True(hasUser1);
            Assert.True(hasUser3);
            Assert.True(hasUser5);
        }

        [Fact]
        public void AddUser_ValidUsers_ReturnsTrue()
        {
            _output.WriteLine("AddUser_ValidUsers_ReturnsTrue");
            // Arrange
            var network = _network;

            // Act
            var addUser = network.AddUser(GenerateUserId(7));
            var hasUser = network.HasUser(GenerateUserId(7));

            // Assert
            Assert.True(addUser);
            Assert.True(hasUser);
        }

        [Fact]
        public void GetConnection_ValidIds_ReturnsConnection()
        {
            _output.WriteLine("GetConnection_ValidIds_ReturnsConnection");
            // Arrange
            var network = _network;

            // Act
            var connection1 = network.GetConnection(GenerateUserId(1), GenerateUserId(2));
            var connection2 = network.GetConnection(GenerateUserId(2), GenerateUserId(3));
            var connection3 = network.GetConnection(GenerateUserId(4), GenerateUserId(3));

            // Assert
            Assert.NotNull(connection1);
            Assert.Equal(GenerateUserId(1), connection1.UserId1);
            Assert.Equal(GenerateUserId(2), connection1.UserId2);
            Assert.Equal(10, connection1.Strength1.Value);
            Assert.Equal(20, connection1.Strength2.Value);
            _output.WriteLine(connection1.ToString());

            Assert.NotNull(connection2);
            Assert.Equal(GenerateUserId(2), connection2.UserId1);
            Assert.Equal(GenerateUserId(3), connection2.UserId2);
            Assert.Equal(25, connection2.Strength1.Value);
            Assert.Equal(25, connection2.Strength2.Value);
            _output.WriteLine(connection2.ToString());

            Assert.NotNull(connection3);
            Assert.Equal(GenerateUserId(4), connection3.UserId1);
            Assert.Equal(GenerateUserId(3), connection3.UserId2);
            Assert.Equal(85, connection3.Strength1.Value);
            Assert.Equal(80, connection3.Strength2.Value);
            _output.WriteLine(connection3.ToString());
        }
        
        // [Fact]
        // public void AddConnection_ValidConnection_ReturnsTrue()
        // {
        //     _output.WriteLine("AddConnection_ValidConnection_ReturnsTrue");
        //     throw new NotImplementedException();
        //     // Arrange
        //     // Act
        //     // Assert
        // }
        
    }
}