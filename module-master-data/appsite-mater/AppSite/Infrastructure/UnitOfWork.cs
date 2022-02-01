using System.Threading.Tasks;
using AppSite.Domain.Shared;

namespace AppSite.Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly AppSiteContext _context;

        public UnitOfWork(AppSiteContext context)
        {
            this._context = context;
        }

        public async Task<int> CommitAsync()
        {
            return await this._context.SaveChangesAsync();
        }
    }
}