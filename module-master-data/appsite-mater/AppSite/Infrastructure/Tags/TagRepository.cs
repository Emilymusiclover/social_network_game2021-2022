using AppSite.Domain.Tags;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AppSite.Infrastructure.Shared;

namespace AppSite.Infrastructure.Tags
{
    public class TagRepository : BaseRepository<Tag, TagId>, ITagRepository
    {
        private readonly AppSiteContext _context;

        public TagRepository(AppSiteContext context) : base(context.Tags)
        {
            this._context = context;
        }
    }
}