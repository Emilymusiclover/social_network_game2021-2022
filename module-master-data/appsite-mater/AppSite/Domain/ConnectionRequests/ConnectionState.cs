using AppSite.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace AppSite.Domain.ConnectionRequests
{
    public enum ConnectionState
    {
        pendent,
        accepted,
        rejected
    }
}