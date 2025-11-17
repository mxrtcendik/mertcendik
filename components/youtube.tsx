interface YouTubeProps {
  id: string;
  title?: string;
}

export function YouTube({ id, title }: YouTubeProps) {
  return (
    <div className="my-4 aspect-video w-full overflow-hidden rounded-lg">
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title || "YouTube video"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    </div>
  );
}

