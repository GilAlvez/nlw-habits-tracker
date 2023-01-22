interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = ({ progress }: ProgressBarProps) => {
  return (
    <div className="h-3 rounded-xl bg-zinc-700 mt-4">
      <div
        className="h-3 rounded-xl bg-violet-500 w-3/4 transition-all"
        role="progressbar"
        aria-label="Progresso de hábitos completados nesse dia"
        aria-valuenow={progress}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
