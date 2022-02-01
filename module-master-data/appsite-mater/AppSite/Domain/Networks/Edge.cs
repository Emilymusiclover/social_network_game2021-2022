namespace AppSite.Domain.Networks
{
    public class Edge<V>
    {
        public V VOrig { get; }
        public V VDest { get; }
        public double Weight { get; }

        public Edge(V vOrig, V vDest, double weight)
        {
            this.VOrig = vOrig;
            this.VDest = vDest;
            this.Weight = weight;
        }
    }
}