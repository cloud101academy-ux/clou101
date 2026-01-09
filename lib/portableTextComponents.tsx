import CodeBlock from "@/components/CodeBlock"
import { urlFor } from "@/lib/sanityImage"
import type {
  PortableTextReactComponents,
  PortableTextMarkComponentProps,
} from "@portabletext/react"
import type { ReactNode } from "react"

export const portableTextComponents: Partial<PortableTextReactComponents> = {
  /* ----------------------------------------
     BLOCK TYPES
  ---------------------------------------- */
  types: {
    image: ({ value }: { value?: any }) => {
  if (!value?.asset) return null

  return (
    <figure className="my-10">
      <img
        src={urlFor(value).width(1200).url()}
        alt={value.alt || "Blog image"}
        className="
          w-full
          h-auto
          max-h-[420px]
          sm:max-h-[480px]
          object-cover
          rounded-2xl
        "
      />
      {value.caption && (
        <figcaption className="mt-3 text-center text-sm text-gray-500">
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
},

    code: ({ value }: { value?: any }) => (
      <CodeBlock code={value?.code || ""} filename={value?.filename} />
    ),
  },

  /* ----------------------------------------
     MARKS (THIS WAS BROKEN BEFORE)
  ---------------------------------------- */
  marks: {
    link: ({
      value,
      children,
    }: PortableTextMarkComponentProps<any>) => (
      <a
        href={value?.href}
        target={value?.blank ? "_blank" : undefined}
        rel={value?.blank ? "noopener noreferrer" : undefined}
        className="text-blue-600 underline underline-offset-4 hover:text-blue-800"
      >
        {children as ReactNode}
      </a>
    ),
  },

  /* ----------------------------------------
     LISTS
  ---------------------------------------- */
  list: {
    bullet: ({ children }: { children?: ReactNode }) => (
      <ul className="list-disc pl-6 my-6 space-y-2">{children}</ul>
    ),
    number: ({ children }: { children?: ReactNode }) => (
      <ol className="list-decimal pl-6 my-6 space-y-2">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }: { children?: ReactNode }) => <li>{children}</li>,
    number: ({ children }: { children?: ReactNode }) => <li>{children}</li>,
  },
}