import clsx from 'clsx'

const IconButton =({
  children,
  className,
  compact = false,
  large = false,
  icon: Icon,
  ...props
}) => {
  return (
    <button
      {...props}
      className={clsx(
        className,
        'group relative isolate flex items-center rounded-lg px-2 py-0.5 text-[0.8125rem]/6 font-medium text-white transition-colors hover:text-white-900',
        compact ? 'gap-x-2' : 'gap-x-3'
      )}
    >
      <span className="absolute inset-0 -z-10 scale-75 rounded-lg bg-white/5 opacity-0 transition group-hover:scale-100 group-hover:opacity-100" />
      <Icon className={clsx('flex-none', large ? 'h-6 w-6' : 'h-4 w-4')} />
      <span className="self-baseline text-white">{children}</span>
    </button>
  )
}

export default IconButton
