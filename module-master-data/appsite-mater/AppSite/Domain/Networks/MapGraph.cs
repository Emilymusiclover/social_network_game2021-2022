using System;
using System.Collections.Generic;

namespace AppSite.Domain.Networks
{
    public class MapGraph<V> : IGraph<V>
    {
        // properties
        // graph is always directed
        private int _numVertices;
        private int _numEdges;

        // map vertex to outgoing edges
        private Dictionary<V, Vertex<V>> _map;

        public MapGraph()
        {
            _numVertices = 0;
            _numEdges = 0;
            _map = new();
        }

        public int NumVertices()
        {
            return _numVertices;
        }

        public List<V> Vertices()
        {
            return new List<V>(_map.Keys);
        }

        public int NumEdges()
        {
            return _numEdges;
        }

        public List<Edge<V>> Edges()
        {
            List<Edge<V>> edges = new();

            foreach (var key in _map.Keys)
            {
                var vertex = _map[key];
                if (vertex == null) continue;
                var vEdges = vertex.GetEdges();
                edges.AddRange(vEdges);
            }

            return edges;
        }

        public Vertex<V> GetVertex(V element)
        {
            return _map.GetValueOrDefault(element, null);
        }

        public bool ValidVertex(V element)
        {
            return _map.ContainsKey(element);
        }

        public bool InsertVertex(V newVert)
        {
            if (ValidVertex(newVert))
                return false;

            _map.Add(newVert, new Vertex<V>(newVert));
            _numVertices++;
            return true;
        }

        public bool RemoveVertex(V vert)
        {
            if (!_map.Remove(vert)) return false;
            _numVertices--;
            return true;
        }

        public Edge<V> GetEdge(V vOrig, V vDest)
        {
            var vertex = GetVertex(vOrig);
            return vertex?.GetEdge(vDest);
        }

        public bool InsertEdge(V vOrig, V vDest, double eWeight)
        {
            if (GetEdge(vOrig, vDest) != null)
                return false;

            if (!ValidVertex(vOrig)) InsertVertex(vOrig);

            if (!ValidVertex(vDest)) InsertVertex(vDest);

            Edge<V> edge = new Edge<V>(vOrig, vDest, eWeight);
            GetVertex(vOrig).AddEdge(edge);
            _numEdges++;
            return true;
        }

        public bool RemoveEdge(V vOrig, V vDest)
        {
            if (GetEdge(vOrig, vDest) != null)
                return false;

            GetVertex(vOrig).RemoveAdjacentVertex(vDest);
            _numEdges++;
            return true;
        }

        public List<Edge<V>> IncomingEdges(V vert)
        {
            throw new NotImplementedException();
        }

        public int InDegree(V vert)
        {
            throw new NotImplementedException();
        }

        public int OutDegree(V vert)
        {
            throw new NotImplementedException();
        }

        public List<Edge<V>> OutgoingEdges(V vert)
        {
            throw new NotImplementedException();
        }
    }
}