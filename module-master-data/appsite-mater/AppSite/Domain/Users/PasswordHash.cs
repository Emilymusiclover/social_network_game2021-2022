using System;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

/**
Reference: https://jasonwatmore.com/post/2020/07/16/aspnet-core-3-hash-and-verify-passwords-with-bcrypt*/
public class PasswordHash
{
    public static string Hash(string passwordString)
    {
        return BCrypt.Net.BCrypt.HashPassword(passwordString);
    }

    public static bool VerifyHashedPassword(string hashedPassword, string providedPassword)
    {
        bool isValid = BCrypt.Net.BCrypt.Verify(providedPassword, hashedPassword);

        return isValid;
    }
}