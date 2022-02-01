using System;
using System.Collections.Generic;
using System.Net.Http;
using AppSite;
using AppSite.Domain.Connections;
using AppSite.Domain.Networks;
using AppSite.Domain.Users;
using Microsoft.AspNetCore.Mvc.Testing;
using Moq;
using Xunit;
using Xunit.Abstractions;

namespace AppSiteTests.NetworksTests
{
    public class NetworksServiceTests : IntegrationTest
    {
        private readonly ITestOutputHelper _output;

        private readonly Dictionary<string, Guid> _emailIdDictionary;

        public NetworksServiceTests(ITestOutputHelper output)
        {
            // logger
            _output = output;
            
            // information storage
            _emailIdDictionary = new Dictionary<string, Guid>();

            // moq database context
            if (!CreateDatabaseContext()) throw new Exception("Failed to create database context");
        }

        private bool CreateDatabaseContext()
        {
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

            const int numUsers = 7;

            // create users
            var userEmails = new List<string>();
            for (var i = 0; i < numUsers; i++)
            {
                userEmails.Add($"u{i}@email.com");
                // _userService.AddAsync(new RegisterUserDto(userEmails[i], "StrongPassword!123", null));
            }

            // get user ids
            // foreach (var email in userEmails)
            // {
            //     var user = _userService.GetUserByEmail(email).Result;
            //     _emailIdDictionary.Add(email, user.Id.AsGuid());
            // }
            //
            // _connectionService.AddAsync(new CreateConnectionDto
            // {
            //     UserId1 = _emailIdDictionary["u1@email.com"], UserId2 = _emailIdDictionary["u2@email.com"],
            //     Strength1 = 10, Strength2 = 20
            // });
            // _connectionService.AddAsync(new CreateConnectionDto
            // {
            //     UserId1 = _emailIdDictionary["u1@email.com"], UserId2 = _emailIdDictionary["u3@email.com"],
            //     Strength1 = 10, Strength2 = 30
            // });
            // _connectionService.AddAsync(new CreateConnectionDto
            // {
            //     UserId1 = _emailIdDictionary["u1@email.com"], UserId2 = _emailIdDictionary["u4@email.com"],
            //     Strength1 = 20, Strength2 = 50
            // });
            //
            // _connectionService.AddAsync(new CreateConnectionDto
            // {
            //     UserId1 = _emailIdDictionary["u2@email.com"], UserId2 = _emailIdDictionary["u3@email.com"],
            //     Strength1 = 25, Strength2 = 25
            // });
            // _connectionService.AddAsync(new CreateConnectionDto
            // {
            //     UserId1 = _emailIdDictionary["u2@email.com"], UserId2 = _emailIdDictionary["u5@email.com"],
            //     Strength1 = 80, Strength2 = 85
            // });
            //
            // _connectionService.AddAsync(new CreateConnectionDto
            // {
            //     UserId1 = _emailIdDictionary["u3@email.com"], UserId2 = _emailIdDictionary["u4@email.com"],
            //     Strength1 = 10, Strength2 = 20
            // });
            return true;
        }

        [Fact]
        public void CreateNetwork_DatabaseExists_ReturnsNetwork()
        {
            _output.WriteLine("CreateNetwork_DatabaseExists_ReturnsNetwork");
            // Arrange

            // Act
            // var network = _networksService.CreateNetwork(new UserId("u1@email.com"), 3).Result;

            // Assert
            // Assert.NotNull(network);
            // network.Export().ForEach(line => _output.WriteLine(line));
        }
    }
}