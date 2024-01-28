package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
)

// Transaction holds the schema definition for the Transaction entity.
type Transaction struct {
	ent.Schema
}

// Fields of the Transaction.
func (Transaction) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").NotEmpty().Unique(),
		field.String("type"),
		field.String("name"),
		field.String("description"),
		field.Float("value"),
		field.Time("date"),
		field.Time("created_at").Default(time.Now()),
		field.Time("updated_at").Default(time.Now()),
	}
}

// Edges of the Transaction.
func (Transaction) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("holder", User.Type).Ref("transactions").Unique(),
	}
}
