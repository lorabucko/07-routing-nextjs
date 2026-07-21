import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import { fetchNotes } from '@/lib/api'
import NotesClient from './Notes.client'
import type { NoteTag } from '@/types/note'

const PER_PAGE = 12

type TagFilter = NoteTag | 'all'

type PageProps = {
  params: {
    slug?: string[]
  }
}

export default async function NotesFilterPage({ params }: PageProps) {
  const queryClient = new QueryClient()

  const initialPage = 1
  const initialSearch = ''

  const slug = params.slug ?? ['all']

  const rawTag = slug[0] ?? 'all'
  const tagFromSlug: TagFilter = rawTag as TagFilter

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialSearch, initialPage, tagFromSlug],
    queryFn: () =>
      fetchNotes({
        page: initialPage,
        perPage: PER_PAGE,
        search: initialSearch || undefined,
        tag: tagFromSlug,
      }),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <NotesClient
        initialPage={initialPage}
        initialSearch={initialSearch}
        tag={tagFromSlug}
      />
    </HydrationBoundary>
  )
}
