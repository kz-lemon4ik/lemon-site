export default function Flag({ code, className = "" }: { code: string; className?: string }) {
  return <img src={`/flags/${code}.svg`} alt="" width={36} height={36} className={`h-6 w-6 shrink-0 object-contain ${className}`} />;
}
