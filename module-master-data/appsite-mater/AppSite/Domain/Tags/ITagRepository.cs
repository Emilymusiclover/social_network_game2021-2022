using AppSite.Domain.Shared;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System;

namespace AppSite.Domain.Tags
{
    public interface ITagRepository : IRepository<Tag, TagId>
    {
    }
}