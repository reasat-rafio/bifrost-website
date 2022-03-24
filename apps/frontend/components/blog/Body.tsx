import { BlogBody } from 'lib/@types/blogTypes'
import React, { createRef, useEffect, useState } from 'react'

interface BodyProps {
  body: BlogBody[]
}

export const Body: React.FC<BodyProps> = ({ body }) => {
  const [sectionRefs, setSectionRefs] = useState([])
  const sections = body
  const totalSectionsLength = sections.length

  useEffect(() => {
    setSectionRefs((sectionRefs) =>
      [...Array(totalSectionsLength)].map((_, i) => sectionRefs[i] || createRef()),
    )
  }, [totalSectionsLength])

  return (
    <section className="grid grid-cols-12 gap-10">
      <div className="col-span-3"></div>
      <div className="col-span-9 max-w-5xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus doloribus quisquam
        aspernatur enim debitis quasi officia quia corrupti voluptatem autem aliquid consequuntur
        rerum harum dicta quibusdam eos ad, dignissimos libero sunt unde? Nobis impedit quia nisi
        nesciunt ipsum fuga, pariatur doloremque modi voluptates cupiditate ea excepturi molestiae
        ut dolor ratione fugit nam odio facere fugiat id, vitae illum voluptatibus enim? Eos
        doloremque dolore nam ipsa veniam distinctio perferendis dolorem voluptatibus perspiciatis
        est modi facilis magni, ipsam ea excepturi necessitatibus nesciunt natus nobis cum et
        magnam! Voluptas dignissimos veritatis eius minima iusto unde facilis nemo ratione obcaecati
        aperiam! Vero commodi qui, et dicta voluptate quidem placeat aut earum similique distinctio
        consectetur fugit odio accusantium molestiae dolor labore deleniti delectus velit
        perferendis enim esse. Suscipit atque laborum eveniet iure, necessitatibus quasi fuga itaque
        eius rerum adipisci ratione, quo dignissimos vel saepe. Vel eligendi eius dolorum cumque
        possimus a beatae vero error illum fugiat! Corrupti mollitia cumque sit quas beatae laborum
        cupiditate voluptate nulla aspernatur quaerat iure obcaecati, ex, rerum temporibus
        voluptatibus quibusdam itaque ea officiis alias ut voluptates odit! Similique illum
        consectetur fugit, natus quae est quibusdam? Doloremque eaque itaque eum, provident
        excepturi unde incidunt, cupiditate sed blanditiis nisi nulla in molestias atque aspernatur
        delectus repellat! Sapiente ipsum ullam fugit voluptatibus ut fuga, officiis obcaecati,
        labore recusandae voluptas necessitatibus! Animi tenetur vero sapiente iste libero
        doloremque fuga repellendus necessitatibus cupiditate ea optio, itaque modi ipsa praesentium
        dolore neque repellat corporis. Error ea omnis nisi impedit illum. Porro obcaecati, ut
        consequatur sed recusandae asperiores dolorum, animi dolor rem quam expedita ad? Cupiditate,
        suscipit! Nobis ratione mollitia pariatur quas sunt exercitationem nesciunt deserunt autem
        magni nemo blanditiis dolorum odio quo, cupiditate eligendi reprehenderit voluptates libero
        vel expedita magnam omnis obcaecati praesentium, unde rem. Repellat excepturi accusantium
        qui eveniet distinctio itaque sed temporibus maxime at! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Fugiat atque, hic fugit laborum voluptas velit dolorem rem in
        ex! Ab explicabo numquam, alias, quis eaque consectetur magni atque beatae vero autem
        incidunt. Nobis obcaecati dolorem harum totam debitis nihil vitae at consectetur, beatae cum
        porro nesciunt minus nam. Modi quibusdam sunt atque doloribus facilis corrupti ullam iste,
        officiis fugit at quasi, earum adipisci quas dolorem a dolores alias eos enim voluptatum quo
        reprehenderit sit fugiat? Dolor numquam hic perspiciatis placeat sint, ea necessitatibus,
        incidunt nobis quibusdam itaque unde eum tempora voluptates minus. Inventore eos nisi nobis
        qui? Veritatis quia nam atque ipsam tenetur voluptatibus consectetur pariatur vel sapiente,
        adipisci minus nemo similique quaerat quae perspiciatis. Laborum inventore et numquam
        doloribus ex, praesentium modi ut provident sapiente sequi quasi repellat hic possimus
        accusamus. Et, possimus excepturi! Tempore dolor placeat, minus magnam fugiat quod ullam
        debitis porro est sapiente nostrum voluptates, dignissimos quos. Iusto quasi culpa, iure
        pariatur soluta optio corporis tenetur illo earum enim maxime neque quo quod quaerat non!
        Saepe ratione corrupti reiciendis nam. Veniam non nihil quidem, eum nesciunt recusandae iste
        tenetur magnam nam molestiae. Quos eius a temporibus, doloribus unde provident dignissimos
        eligendi. Fugiat quae alias veritatis deleniti!
      </div>
    </section>
  )
}
