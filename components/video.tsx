interface VideoProps {
  src: string;
  title?: string;
  className?: string;
}

export function Video({ src, title, className = "" }: VideoProps) {
  return (
    <div className={`my-4 ${className}`}>
      <video
        src={src}
        controls
        className="w-full rounded-lg"
        title={title}
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

