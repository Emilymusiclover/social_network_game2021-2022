using AppSite.Domain.Shared;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace AppSite.Domain.IntroductionRequests
{
    public enum IntroductionState
    {
        pendent,
        accepted,
        rejected
    }
}