using AppSite.Domain.Tags;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AppSite.Infrastructure.Shared;

namespace AppSite.Infrastructure.Tags
{
    public class TagCloudRepository : BaseRepository<TagCloud, TagCloudId>, ITagCloudRepository
    {
        private readonly AppSiteContext _context;

        public TagCloudRepository(AppSiteContext context) : base(context.TagClouds)
        {
            this._context = context;
        }

        public async Task<List<TagCloud>> GetAllTagCloud()
        {
            return await this._context.TagClouds.Include(u => u.Tags)
                .ToListAsync();
        }

        public async Task<TagCloud> GetTagCloudById(TagCloudId id)
        {
            return await this._context.TagClouds
                .Where(x => id.Equals(x.Id)).Include(x => x.Tags).FirstOrDefaultAsync();
        }


        public async Task AddTags(TagCloudId id, List<Tag> tags)
        {
            var tagCloud = await this._context.TagClouds.Where(x => id.Equals(x.Id)).Include(x => x.Tags)
                .FirstOrDefaultAsync();


            this._context.Attach(tagCloud);

            tagCloud.Tags.AddRange(tags);

            await this._context.SaveChangesAsync();
        }
    }
}