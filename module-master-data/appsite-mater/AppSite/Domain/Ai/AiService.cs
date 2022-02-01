using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using AppSite.Domain.Connections;
using AppSite.Domain.Users;
using System.Collections.Specialized;
using Microsoft.AspNetCore.WebUtilities;
using System.Collections.Specialized;
using System.Web;
using AppSite.Domain.Tags;

namespace AppSite.Domain.Ai
{
    public class AiService
    {
        // prolog syntax
        public const string PrologServerUrl = "http://localhost:5555";
        public const string UserFact = "no";
        public const string ConnFact = "ligacao";

        // repositories
        private readonly IConnectionRepository _connectionsRepo;
        private readonly IUserRepository _usersRepo;

        // http client
        private readonly HttpClient _client;

        public AiService(IConnectionRepository connectionsRepo, IUserRepository usersRepo)
        {
            _connectionsRepo = connectionsRepo;
            _usersRepo = usersRepo;
            // http client init & setup
            _client = new HttpClient();
            _client.Timeout = TimeSpan.FromSeconds(3);
        }

        public async Task<bool> GetHello()
        {
            try
            {
                var response = await _client.GetAsync($"{PrologServerUrl}/hello");
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();
                // Above three lines can be replaced with new helper method below
                // string responseBody = await client.GetStringAsync(uri);
                Console.WriteLine(responseBody);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("Warning: {0} ", e.Message);
                return false;
            }
        }

        public async Task<string> GetStrongestPath(string Orig, string Dest)
        {
            try
            {
                var query = new Dictionary<string, string>
                {
                    ["origem"] = Orig,
                    ["destino"] = Dest,
                };

                var response =
                    await _client.GetAsync(QueryHelpers.AddQueryString($"{PrologServerUrl}/strongestPath", query));


                //  var response =
                //      await _client.GetAsync($"{PrologServerUrl}/strongestPath?origem=${Orig}&destino=${Dest}");
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();
                // Above three lines can be replaced with new helper method below
                // string responseBody = await client.GetStringAsync(uri);

                //    var result = new List<string>();
                /*     char[] delimiterChars = {','};

                     string[] words = responseBody.Split(delimiterChars);

                     foreach (var word in words)
                     {
                         result.Add(word.Trim());
                     }

                     Console.WriteLine(responseBody); */
                return responseBody;
            }
            catch (Exception e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
                return null;
            }
        }

        public async Task<string> GetSafestPath(string Orig, string Dest, int limit)
        {
            try
            {
                var url = new UriBuilder($"{PrologServerUrl}/safestPath");

                NameValueCollection queryParams = HttpUtility.ParseQueryString(url.Query);
                queryParams.Add("origem", Orig);
                queryParams.Add("destino", Dest);
                queryParams.Add("limit", limit.ToString());

                url.Query = queryParams.ToString();

                var response = await _client.GetAsync(url.Query);


                //  var response =
                //      await _client.GetAsync($"{PrologServerUrl}/strongestPath?origem=${Orig}&destino=${Dest}");
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();
                // Above three lines can be replaced with new helper method below
                // string responseBody = await client.GetStringAsync(uri);

                //    var result = new List<string>();
                /*     char[] delimiterChars = {','};

                     string[] words = responseBody.Split(delimiterChars);

                     foreach (var word in words)
                     {
                         result.Add(word.Trim());
                     }

                     Console.WriteLine(responseBody); */
                return responseBody;
            }
            catch (Exception e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
                return null;
            }
        }

        public async Task<string> GetShortestPath(string Orig, string Dest)
        {
            try
            {
                var query = new Dictionary<string, string>
                {
                    ["origem"] = Orig,
                    ["destino"] = Dest,
                };

                var response =
                    await _client.GetAsync(QueryHelpers.AddQueryString($"{PrologServerUrl}/shortestPath", query));


                //  var response =
                //      await _client.GetAsync($"{PrologServerUrl}/strongestPath?origem=${Orig}&destino=${Dest}");
                response.EnsureSuccessStatusCode();
                var responseBody = await response.Content.ReadAsStringAsync();
                // Above three lines can be replaced with new helper method below
                // string responseBody = await client.GetStringAsync(uri);

                //    var result = new List<string>();
                /*     char[] delimiterChars = {','};

                     string[] words = responseBody.Split(delimiterChars);

                     foreach (var word in words)
                     {
                         result.Add(word.Trim());
                     }

                     Console.WriteLine(responseBody); */
                return responseBody;
            }
            catch (Exception e)
            {
                Console.WriteLine("\nException Caught!");
                Console.WriteLine("Message :{0} ", e.Message);
                return null;
            }
        }

        private class TagsNameComparer : IEqualityComparer<Tag>
        {
            public bool Equals(Tag x, Tag y)
            {
                return string.Equals(x?.TagName.TagString, y?.TagName.TagString, StringComparison.OrdinalIgnoreCase);
            }

            public int GetHashCode(Tag obj)
            {
                return obj.TagName.TagString.GetHashCode();
            }
        }

        public async Task<List<UserDto>> GetFriendRecommendations(UserId userId, int numTags = 1, int maxLevel = 3)
        {
            // result
            var list = new List<UserDto>();

            // prolog recommendations
            // try
            // {
            //     // do request
            //     var response = await _client.GetAsync($"{PrologServerUrl}/friendsRecommendations?" +
            //                                           $"userId=${userId}" +
            //                                           $"&numTags=${numTags}" +
            //                                           $"&maxLevel=${maxLevel}");
            //     response.EnsureSuccessStatusCode();
            //     // process response
            //     var responseBody = await response.Content.ReadAsStringAsync();
            //     Console.WriteLine(responseBody);
            //     // return
            //     if (list.Count != 0) return list;
            // }
            // catch (Exception e)
            // {
            //     Console.WriteLine("Warning: {0} ", e.Message);
            // }

            // fallback recommendations
            if (userId == null) return list;
            var cloud = await _usersRepo.GetTagCloudByUserId(userId.AsGuid());
            var tags = cloud?.Tags;
            if (tags == null) return list;

            var users = await _connectionsRepo.GetFriendsToBe(userId);
            foreach (var user in users)
            {
                // get user tags
                var uCloud = await _usersRepo.GetTagCloudByUserId(user.Id.AsGuid());
                var uTags = uCloud?.Tags;
                if (uTags == null)
                    continue;

                // verify if they have common tags
                var intersect = uTags.Intersect(tags, new TagsNameComparer()).Any();
                if (intersect)
                    list.Add(user.AsDto());
            }

            return list;
        }

        public async Task<string> ExportKnowledgeBase()
        {
            // get users
            var users = await _usersRepo.GetAllUsers();

            // create knowledge base
            var knowledgeBase = new StringBuilder();
            foreach (var user in users)
            {
                // get tags
                var tags = user.UserProfile?.UserTagCloud?.Tags?.Select(tag => $"{tag.TagName.TagString}");
                var tagsStr = tags != null ? string.Join(",", tags) : "";
                // format output
                knowledgeBase.Append($"{UserFact}('{user.Id.AsGuid()}','{user.UserEmail.EmailString}',[{tagsStr}]).\n");
            }

            // get connections
            var connections = await _connectionsRepo.GetAllAsync();
            foreach (var conn in connections)
            {
                knowledgeBase.Append(
                    $"{ConnFact}('{conn.UserId1}', '{conn.UserId2}', {conn.Strength1.Value}, {conn.Strength2.Value}).\n");
            }

            // return as string
            return knowledgeBase.ToString();
        }

        public Task<bool> LoadKnowledgeBase()
        {
            // update prolog server
            throw new NotImplementedException();
        }
    }
}