using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AppSite.Domain.Networks;

namespace AppSite.Infrastructure
{
    public static class FileHandler
    {
        // folders path
        private const string Output = "../output";
        private static readonly string NetworkExports = $"{Output}/network-exports";

        public static Task<bool> ExportNetwork(string network)
        {
            try
            {
                if (!Directory.Exists(NetworkExports)) Directory.CreateDirectory(NetworkExports);
                var path = $"{NetworkExports}/export-{DateTime.Now.Ticks}.pl";
                File.WriteAllText(path, network);
                return Task.FromResult(true);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return Task.FromResult(false);
            }
        }
    }
}