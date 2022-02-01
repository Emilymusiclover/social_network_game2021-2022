namespace AppSite.Domain.Shared
{
    /// <summary>
    /// Base class for Dtos.
    /// </summary>
    public interface IDto<TEntity>
    {
        TEntity Convert();
    }
}