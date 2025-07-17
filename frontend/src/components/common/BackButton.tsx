'use client';

interface BackButtonProps {
  className?: string;
  children: React.ReactNode;
}

export function BackButton({ className, children }: BackButtonProps) {
  const handleClick = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
    >
      {children}
    </button>
  );
}
