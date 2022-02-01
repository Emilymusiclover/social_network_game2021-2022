using System.Collections.Generic;
using AppSite.Domain.Connections;
using AppSite.Domain.Users;

namespace AppSite.Domain.Networks
{
    public class Network
    {
        // center user (logged in)
        private readonly UserId _userId;

        // graph
        private readonly IGraph<UserId> _graph;

        public Network(UserId userId, IGraph<UserId> graph)
        {
            _userId = userId;
            _graph = graph;
        }

        public UserId GetCenter()
        {
            return _userId;
        }

        public List<UserId> GetAllUserIds()
        {
            return _graph.Vertices();
        }

        public Vertex<UserId> GetVertex(UserId userId)
        {
            return _graph.GetVertex(userId);
        }

        public bool HasUser(UserId userId)
        {
            return _graph.ValidVertex(userId);
        }

        public bool AddUser(UserId userId)
        {
            return _graph.InsertVertex(userId);
        }

        public int NumEdges()
        {
            return _graph.NumEdges();
        }

        public List<Connection> GetAllConnections()
        {
            List<Connection> connections = new();
            foreach (var edge in _graph.Edges())
            {
                if (connections.Exists(conn
                        => conn.UserId1 == edge.VOrig && conn.UserId2 == edge.VDest))
                    continue;

                var conn = GetConnection(edge.VOrig, edge.VDest);
                if (conn == null) continue;
                connections.Add(conn);
            }

            return connections;
        }

        public Connection GetConnection(UserId id1, UserId id2)
        {
            var edge1 = _graph.GetEdge(id1, id2);
            var edge2 = _graph.GetEdge(id2, id1);
            if (edge1 == null || edge2 == null) return null;

            return new Connection(
                id1,
                id2,
                new RelationshipStrength((int) edge1.Weight),
                new RelationshipStrength((int) edge2.Weight)
            );
        }

        public bool HasConnection(UserId id1, UserId id2)
        {
            return GetConnection(id1, id2) != null;
        }

        public bool AddConnection(Connection connection)
        {
            if (HasConnection(connection.UserId1, connection.UserId2))
                return false;

            _graph.InsertEdge(connection.UserId1, connection.UserId2, connection.Strength1.Value);
            _graph.InsertEdge(connection.UserId2, connection.UserId1, connection.Strength2.Value);
            return true;
        }

        public bool RemoveConnection(Connection connection)
        {
            if (!HasConnection(connection.UserId1, connection.UserId2))
                return false;

            _graph.RemoveEdge(connection.UserId1, connection.UserId2);
            _graph.RemoveEdge(connection.UserId2, connection.UserId1);
            return true;
        }
    }
}