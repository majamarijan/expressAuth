export type SectionType = 'single' | 'multiple'

export default function Section({type, className, children}: {type?: SectionType, className?: string, children: React.ReactNode}) {
  return (
    <section className={`relative flex items-center ${type === 'multiple' ? 'flex-col lg:flex-row' : 'flex-col'} justify-center overflow-hidden min-h-[50vh] px-8 py-16 ${className}`}>{children}</section>
  )

}