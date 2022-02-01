namespace AppSite.Domain.Shared
{
    /// <summary>
    /// Base class for Entities Dtoable.
    /// </summary>
    public interface IDtoable<IDto>
    {
        IDto AsDto();
    }
}