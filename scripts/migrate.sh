#!/bin/bash
set -e

echo "=== Comedy Tribune DB Migration ==="

if [ -z "$POSTGRES_URL" ]; then
  echo "ERROR: POSTGRES_URL environment variable not set"
  exit 1
fi

echo "Running migrations..."

psql "$POSTGRES_URL" << 'SQL'
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  author_name TEXT NOT NULL,
  author_bio TEXT,
  author_headshot TEXT,
  category TEXT NOT NULL,
  thumbnail TEXT,
  body TEXT,
  excerpt TEXT,
  publish_date TIMESTAMPTZ DEFAULT NOW(),
  published BOOLEAN DEFAULT FALSE,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS docs (
  id SERIAL PRIMARY KEY,
  episode_number TEXT NOT NULL,
  subject TEXT NOT NULL,
  title TEXT NOT NULL,
  thumbnail TEXT,
  youtube_url TEXT,
  status TEXT DEFAULT 'coming_soon',
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO articles (title, slug, author_name, category, excerpt, body, published, featured, publish_date)
VALUES (
  'Why Canada Built the Best Comedy Writers in the World',
  'canada-best-comedy-writers',
  'The Comedy Tribune',
  'Industry',
  'From SCTV to SNL, the pipeline from Canada to American television comedy is not an accident. It''s a system.',
  '## The System Nobody Talks About

When Lorne Michaels hired his first writing staff for Saturday Night Live in 1975, he reached north. Not because Canadian writers were cheaper (they weren''t), but because they were better prepared. They came from a country where comedy was survival — where the cold and the colonial anxiety and the proximity to American culture created a particular kind of writer: observational, self-deprecating, technically precise.

SCTV didn''t just produce funny television. It produced a generation of comedy writers who understood structure, character, and the difference between a joke and a bit. John Candy, Martin Short, Eugene Levy, Andrea Martin, Catherine O''Hara — these weren''t discovered at SCTV. They were *made* there.

## The Training Ground

The Second City Toronto opened in 1973. Within a decade it had become the most reliable pipeline in North American comedy. The difference between Second City Chicago and Second City Toronto wasn''t talent — it was context. Canadian performers had to earn their American moment. That hunger produced a different kind of discipline.

> "We always felt like we had to prove something. That the work had to be undeniable."

The pipeline ran from Second City Toronto to SCTV to NBC to SNL and beyond. It wasn''t accidental. It was structural.

## What It Means Now

The same system is still running. Canada punches far above its weight in American comedy writing rooms, late night staff, and feature film comedy. The names change — Schitt''s Creek, Letterkenny, the alumni of The Second City Toronto today — but the machinery is the same.

Understanding this pipeline isn''t just comedy history. It''s a case study in how creative infrastructure shapes what gets made and who gets to make it.',
  true,
  true,
  NOW()
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO docs (episode_number, subject, title, status, published)
VALUES ('EP01', 'John Candy', 'The Man Who Couldn''t Say No', 'in_production', true)
ON CONFLICT DO NOTHING;

SELECT 'Migration complete.' as status;
SQL

echo "=== Migration finished ==="
