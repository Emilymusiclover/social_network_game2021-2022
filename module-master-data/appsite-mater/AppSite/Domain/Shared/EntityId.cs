using System;

namespace AppSite.Domain.Shared
{
    /// <summary>
    /// Base class for entities.
    /// </summary>
    public abstract class EntityId : IEquatable<EntityId>, IComparable<EntityId>
    {
        protected object ObjValue { get; }

        public string Value
        {
            get
            {
                if (ObjValue is string strValue)
                    return strValue;
                return AsString();
            }
        }

        protected EntityId(object value)
        {
            if (value is string strValue)
                ObjValue = CreateFromString(strValue);
            else
                ObjValue = value;
        }


        protected abstract object CreateFromString(string text);

        public abstract string AsString();


        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            return obj is EntityId other && Equals(other);
        }

        public override int GetHashCode()
        {
            return Value.GetHashCode();
        }

        public bool Equals(EntityId other)
        {
            if (other == null)
                return false;
            if (GetType() != other.GetType())
                return false;
            return Value == other.Value;
        }

        public override string ToString()
        {
            return AsString();
        }

        public int CompareTo(EntityId other)
        {
            if (other == null)
                return -1;
            return string.Compare(Value, other.Value, StringComparison.Ordinal);
        }

        public static bool operator ==(EntityId obj1, EntityId obj2)
        {
            return Equals(obj1, null) ? Equals(obj2, null) : obj1.Equals(obj2);
        }

        public static bool operator !=(EntityId x, EntityId y)
        {
            return !(x == y);
        }
    }
}