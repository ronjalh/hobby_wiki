import { PostForm } from '@/components/admin/PostForm';

type Props = {
  searchParams: Promise<{ hobby?: string }>;
};

export default async function NyInnleggPage({ searchParams }: Props) {
  const { hobby } = await searchParams;
  const initialHobby =
    hobby === 'lys' || hobby === 'smykker' ? hobby : undefined;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-serif">Nytt innlegg</h2>
        <p className="text-muted-foreground mt-1">
          Skriv innholdet og publiser når du er klar.
        </p>
      </div>
      <PostForm initialHobby={initialHobby} />
    </div>
  );
}
