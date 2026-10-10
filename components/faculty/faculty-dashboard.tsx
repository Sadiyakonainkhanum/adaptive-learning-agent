 'use client'

import { useState } from 'react'

type Proposal = {
  id: number
  title: string
  subject: string
  description: string
  status: 'Pending' | 'Accepted' | 'Rejected'
}

const initialProposals: Proposal[] = [
  {
    id: 1,
    title: 'Reinforce Binary Search',
    subject: 'Data Structures',
    description:
      'Recommend a short lesson and guided practice before advanced searching problems.',
    status: 'Pending',
  },
  {
    id: 2,
    title: 'Practice SQL Joins',
    subject: 'DBMS',
    description:
      'Provide additional INNER JOIN and LEFT JOIN questions with feedback.',
    status: 'Pending',
  },
  {
    id: 3,
    title: 'Review Algorithm Complexity',
    subject: 'Algorithms',
    description:
      'Review time complexity with examples before the next challenge.',
    status: 'Pending',
  },
]

export function FacultyDashboard() {
  const [proposals, setProposals] = useState(initialProposals)
  const [search, setSearch] = useState('')

  function updateStatus(
    id: number,
    status: 'Accepted' | 'Rejected',
  ) {
    setProposals((current) =>
      current.map((proposal) =>
        proposal.id === id ? { ...proposal, status } : proposal,
      ),
    )
  }

  const filteredProposals = proposals.filter((proposal) =>
    `${proposal.title} ${proposal.subject}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  )

  const pending = proposals.filter(
    (proposal) => proposal.status === 'Pending',
  ).length

  const accepted = proposals.filter(
    (proposal) => proposal.status === 'Accepted',
  ).length

  const rejected = proposals.filter(
    (proposal) => proposal.status === 'Rejected',
  ).length

  return (
    <main className="min-h-screen bg-slate-50 p-5 text-slate-900 sm:p-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-indigo-600">
              ADAPTIVE · FACULTY WORKSPACE
            </p>
            <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
              Faculty Dashboard
            </h1>
            <p className="mt-2 text-slate-500">
              Review learning recommendations and guide student progress.
            </p>
          </div>

          <span className="rounded-full bg-amber-100 px-4 py-2 text-sm font-semibold text-amber-800">
            Demo Mode
          </span>
        </header>

        <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { label: 'Awaiting Review', value: pending },
            { label: 'Accepted', value: accepted },
            { label: 'Rejected', value: rejected },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <p className="text-sm text-slate-500">{item.label}</p>
              <p className="mt-2 text-3xl font-bold">{item.value}</p>
            </div>
          ))}
        </section>

        <section className="mt-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold">Learning Proposals</h2>
              <p className="mt-1 text-sm text-slate-500">
                Review each sample recommendation.
              </p>
            </div>

            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search proposals..."
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-indigo-500 sm:w-72"
            />
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {filteredProposals.map((proposal) => (
              <article
                key={proposal.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="text-sm font-medium text-indigo-600">
                    {proposal.subject}
                  </span>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      proposal.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800'
                        : proposal.status === 'Accepted'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {proposal.status}
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold">
                  {proposal.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {proposal.description}
                </p>

                {proposal.status === 'Pending' && (
                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(proposal.id, 'Accepted')
                      }
                      className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      Accept
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        updateStatus(proposal.id, 'Rejected')
                      }
                      className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold hover:bg-slate-50"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>

          {filteredProposals.length === 0 && (
            <p className="mt-6 rounded-xl bg-white p-6 text-center text-slate-500">
              No matching proposals found.
            </p>
          )}
        </section>

        <footer className="mt-10 border-t border-slate-200 pt-5 text-sm text-slate-500">
          ADAPTIVE · Sample proposals for demonstration only.
        </footer>
      </div>
    </main>
  )
}