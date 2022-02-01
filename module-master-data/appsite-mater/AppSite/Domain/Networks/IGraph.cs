using System.Collections.Generic;
using AppSite.Domain.Users;

namespace AppSite.Domain.Networks
{
    public interface IGraph<V>
    {
        // Returns the number of vertices of the graph
        int NumVertices();

        // Returns all the vertices of the graph as an iterable collection
        List<V> Vertices();

        // Returns the number of edges of the graph
        int NumEdges();

        // Returns the information of all the edges of the graph as an iterable collection
        List<Edge<V>> Edges();

        // Returns the vertex corresponding to the given element
        public Vertex<V> GetVertex(V element);

        // Returns the edge from vOrig to vDest, or null if vertices are not adjacent
        Edge<V> GetEdge(V vOrig, V vDest);

        // Returns true if vertex exists, false otherwise
        bool ValidVertex(V element);

        /*
        Returns the number of edges leaving vertex v
        For an undirected graph, this is the same result returned by inDegree
        */
        int OutDegree(V vert);

        /*
        Returns the number of edges for which vertex v is the destination
        For an undirected graph, this is the same result returned by outDegree
        */
        int InDegree(V vert);

        /*
        Returns an iterable collection of edges for which vertex v is the origin
        for an undirected graph, this is the same result returned by incomingEdges
        */
        List<Edge<V>> OutgoingEdges(V vert);

        /*
        Returns an iterable collection of edges for which vertex v is the destination
        For an undirected graph this is the same result as returned by incomingEdges
        */
        List<Edge<V>> IncomingEdges(V vert);

        // Inserts a new vertex with some specific comparable type
        bool InsertVertex(V newVert);

        /*
        Adds a new edge between vertices u and v, with some
        specific comparable type. If vertices u, v don't exist in the graph they
        are inserted
        */
        bool InsertEdge(V vOrig, V vDest, double eWeight);

        // Removes a vertex and all its incident edges from the graph
        bool RemoveVertex(V vert);

        // Removes the edge between two vertices
        bool RemoveEdge(V vOrig, V vDest);
    }
}