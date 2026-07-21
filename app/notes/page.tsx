import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { QueryClient } from '@tanstack/react-query'
import { fetchNotes } from '../../lib/api'
import NotesClient from './Notes.client'
import css from './NotesPage.module.css'

const PER_PAGE = 12

export default async function NotesPage() {
  const queryClient = new QueryClient()

  const initialPage = 1
  const initialSearch = ''

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialSearch, initialPage],
    queryFn: () =>
      fetchNotes({
        page: initialPage,
        perPage: PER_PAGE,
        search: initialSearch || undefined,
      }),
  })

  const dehydratedState = dehydrate(queryClient)

  return (
    <main className={css.main}>
      <HydrationBoundary state={dehydratedState}>
        <NotesClient initialPage={initialPage} initialSearch={initialSearch} />
      </HydrationBoundary>
    </main>
  )
}
