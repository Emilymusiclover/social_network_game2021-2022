using System;
using System.Collections.Generic;
using AppSite.Domain.Shared;

namespace AppSite.Domain.EmotionalStates
{
    // (EmotionalState) Enum.Parse(typeof(EmotionalState), emotionalState);
    public enum EmotionalState
    {
        // default None
        None,
        Joy,
        Distress,
        Hope,

        Fear,

        Relief,

        Disappointment,

        Pride,

        Remorse,

        Gratitude,

        Anger,

        Like,

        Dislike
    }
}