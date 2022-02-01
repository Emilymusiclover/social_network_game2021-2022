using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;
using AppSite.Domain.Shared;

namespace AppSite.Domain.Tags
{
    public interface ITagCloudRepository : IRepository<TagCloud, TagCloudId>
    {
        Task<List<TagCloud>> GetAllTagCloud();

        Task<TagCloud> GetTagCloudById(TagCloudId id);

        Task AddTags(TagCloudId id, List<Tag> tags);
    }
}