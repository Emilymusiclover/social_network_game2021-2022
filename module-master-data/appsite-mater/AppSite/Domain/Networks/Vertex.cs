using System.Collections.Generic;

namespace AppSite.Domain.Networks
{
    public class Vertex<V>
    {
        public V Element { get; }
        private Dictionary<V, Edge<V>> _outVerts;

        public Vertex(V element)
        {
            this.Element = element;
            _outVerts = new();
        }

        public List<V> GetVertices()
        {
            return new List<V>(_outVerts.Keys);
        }

        public List<Edge<V>> GetEdges()
        {
            return new List<Edge<V>>(_outVerts.Values);
        }

        public Edge<V> GetEdge(V vDest)
        {
            return _outVerts.GetValueOrDefault(vDest, null);
        }

        public bool AddEdge(Edge<V> edge)
        {
            if (!edge.VOrig.Equals(Element))
                return false;

            _outVerts.Add(edge.VDest, edge);
            return true;
        }

        public bool RemoveAdjacentVertex(V vDest)
        {
            return _outVerts.Remove(vDest);
        }
    }
}