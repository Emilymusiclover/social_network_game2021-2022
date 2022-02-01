using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AppSite.Domain.Ai;
using AppSite.Domain.Connections;
using AppSite.Domain.Users;

namespace AppSite.Domain.Networks
{
    public class NetworksService
    {
        // graph
        private Network _network;

        // repositories
        private readonly IConnectionRepository _connectionsRepo;
        private readonly IUserRepository _usersRepo;

        public NetworksService(IConnectionRepository connectionsRepo, IUserRepository usersRepo)
        {
            _connectionsRepo = connectionsRepo;
            _usersRepo = usersRepo;
        }

        private async Task<bool> ReloadNetwork(UserId userId, int layer = 3)
        {
            // check if a valid network exists
            if (_network != null && _network.GetCenter() == userId)
                return true;

            // create new network
            var network = await LoadNetwork(userId, layer);
            if (network == null)
                return false;

            // save network and return success
            _network = network;
            return true;
        }

        public async Task<Network> LoadNetwork(UserId userId, int layer)
        {
            // check if user exists
            var center = await _usersRepo.GetUserByUserId(userId.AsGuid());
            if (center == null) return null;

            // create user network
            var network = new Network(userId, new MapGraph<UserId>());

            // fill network
            Queue<UserId> queue = new();
            // enqueue center user
            queue.Enqueue(userId);
            do
            {
                // dequeue
                var u1 = queue.Dequeue();
                // find friends
                var connections = await _connectionsRepo.GetUserConnections(u1);
                if (connections == null) continue;

                foreach (var connection in connections)
                {
                    // get user id 2
                    var u2 = connection.UserId1;
                    if (u2.Equals(u1)) u2 = connection.UserId2;

                    // add friend to queue
                    if (!network.HasUser(u2)) queue.Enqueue(u2);

                    // add friends to network
                    network.AddConnection(connection);
                }
            } while (queue.Count > 0);

            return network;
        }

        public async Task<List<UserDto>> GetAllUsers(UserId userId, int layer)
        {
            // load network and check success
            if (!await ReloadNetwork(userId, layer))
                return null;

            // get user ids
            var userIds = _network.GetAllUserIds();
            // return
            return await LoadUsersFromIds(userIds);
        }

        private async Task<List<UserDto>> LoadUsersFromIds(List<UserId> idsList)
        {
            // get users by id
            var userDtos = new List<UserDto>();
            foreach (var id in idsList)
            {
                var user = await LoadUserFromId(id);
                userDtos.Add(user);
            }

            // return
            return userDtos;
        }

        private async Task<UserDto> LoadUserFromId(UserId id)
        {
            var user = await _usersRepo.GetByIdAsync(id);
            return user?.AsDto();
        }

        public async Task<string> ExportAsKnowledgeBase(UserId userId, int layer)
        {
            // load network and check success
            if (!await ReloadNetwork(userId, layer))
                return null;

            // get user ids
            var userIds = _network.GetAllUserIds();
            // get users from ids
            var knowledgeBase = new StringBuilder();
            foreach (var id in userIds)
            {
                // get user
                var user = await _usersRepo.GetByIdAsync(id);
                if (user == null) continue;
                // get tags
                var tags = user.UserProfile?.UserTagCloud?.Tags?.Select(tag => $"{tag.TagName.TagString}");
                var tagsStr = tags != null ? string.Join(",", tags) : "";
                // format output
                knowledgeBase.Append(
                    $"{AiService.UserFact}({user.Id.AsGuid()},{user.UserEmail.EmailString},[{tagsStr}])\n");
            }

            // get connections
            var connections = _network.GetAllConnections();
            foreach (var conn in connections)
            {
                knowledgeBase.Append(
                    $"{AiService.ConnFact}({conn.UserId1}, {conn.UserId2}, {conn.Strength1.Value}, {conn.Strength2.Value})\n");
            }

            // return as string
            return knowledgeBase.ToString();
        }

        public async Task<Dictionary<UserId, IEnumerable<UserId>>> ExportAsDto(UserId userId, int layer)
        {
            // load network and check success
            if (!await ReloadNetwork(userId, layer))
                return null;

            // get user ids
            var userIds = _network.GetAllUserIds();
            // dictionary
            var dictionary = new Dictionary<UserId, IEnumerable<UserId>>();
            // build network
            foreach (var id in userIds)
            {
                // create new vertex
                var list = _network.GetVertex(id).GetVertices();
                dictionary.Add(id, list);
            }

            // return
            return dictionary;
        }
    }
}