using System.Threading.Tasks;

namespace AppSite.Domain.Shared
{
    public interface IUnitOfWork
    {
        Task<int> CommitAsync();
    }
}