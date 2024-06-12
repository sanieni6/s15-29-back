'use strict';
const { v4: uuidv4 } = require('uuid');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const products = [
      {
        id: uuidv4(),
        name: 'Pintura Única',
        description:
          'Pintura original hecha por un artista reconocido, que captura la esencia del arte contemporáneo y es perfecta para coleccionistas.',
        initial_price: 5000,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156850/uh4oljhcrvjckrs5hgbc.png',
        categoryId: '8286443b-989d-4783-9a42-2d477e0267b7',
        userId: '46e6e7b2-63d0-4bb3-b2c1-e3618d1f9f26',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Escultura',
        description:
          'Escultura de bronce hecha a mano, una obra maestra que añade un toque de elegancia y sofisticación a cualquier espacio.',
        initial_price: 2000,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156852/be8ugyfbvqgoviillhjm.png',
        categoryId: '8286443b-989d-4783-9a42-2d477e0267b7',
        userId: '46e6e7b2-63d0-4bb3-b2c1-e3618d1f9f26',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Fotografía Artística',
        description:
          'Fotografía artística enmarcada y firmada, ideal para decorar espacios modernos con un toque de creatividad.',
        initial_price: 500,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156847/niiht1eu45vmamemo848.png',
        categoryId: '8286443b-989d-4783-9a42-2d477e0267b7',
        userId: '46e6e7b2-63d0-4bb3-b2c1-e3618d1f9f26',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Litografía',
        description:
          'Litografía numerada y firmada por el artista, una obra gráfica de edición limitada que representa un excelente valor para los coleccionistas.',
        initial_price: 200,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156853/vnu91umt4ni3mcs4n5np.png',
        categoryId: '8286443b-989d-4783-9a42-2d477e0267b7',
        userId: '46e6e7b2-63d0-4bb3-b2c1-e3618d1f9f26',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Grabado',
        description:
          'Grabado en metal de edición limitada, con detalles finos y técnicas tradicionales que lo hacen una pieza única en cualquier colección.',
        initial_price: 300,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156852/odscpuniuyq67h4rgrdt.png',
        categoryId: '8286443b-989d-4783-9a42-2d477e0267b7',
        userId: '46e6e7b2-63d0-4bb3-b2c1-e3618d1f9f26',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Mesa Antigua',
        description:
          'Mesa de comedor del siglo XVIII, hecha con maderas nobles y con intrincados detalles tallados a mano, perfecta para amantes de las antigüedades.',
        initial_price: 1500,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156852/uoaufdbmascraald6aop.png',
        categoryId: 'b7211535-6452-4697-a144-35116a62c078',
        userId: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Silla Antigua',
        description:
          'Silla victoriana hecha a mano, una pieza exquisita con tapicería original que refleja el lujo y la elegancia de la época victoriana.',
        initial_price: 1000,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156848/oltbduplgfqwb8mqil8m.png',
        categoryId: 'b7211535-6452-4697-a144-35116a62c078',
        userId: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Joyas Antiguas',
        description:
          'Collar de diamantes de la era eduardiana, una joya histórica que combina artesanía excepcional y valor sentimental.',
        initial_price: 5000,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156861/kbccjfd1sl5az1n9mvmz.png',
        categoryId: 'b7211535-6452-4697-a144-35116a62c078',
        userId: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Piano Antiguo',
        description:
          'Piano de cola Steinway de 1920, restaurado a su gloria original, ofreciendo tanto belleza visual como una calidad de sonido incomparable.',
        initial_price: 10000,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156865/pvqccoe4x0xsgfcddsdf.png',
        categoryId: 'b7211535-6452-4697-a144-35116a62c078',
        userId: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Violín Antiguo',
        description:
          'Violín italiano del siglo XVII, con un sonido rico y cálido, ideal para músicos y coleccionistas de instrumentos históricos.',
        initial_price: 5000,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156864/gfycbxmt4d1ut7kbpswo.png',
        categoryId: 'b7211535-6452-4697-a144-35116a62c078',
        userId: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Tarjeta de Béisbol',
        description:
          'Tarjeta de béisbol rara de un jugador famoso, un tesoro para los fanáticos del deporte y coleccionistas de memorabilia deportiva.',
        initial_price: 50,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156849/oozhouhxgs7c2p3qzwmk.png',
        categoryId: '66fa772a-195a-4006-819e-c37909a7674c',
        userId: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Tarjeta Pokémon',
        description:
          'Tarjeta Pokémon de primera edición, altamente codiciada por coleccionistas y aficionados a los juegos de cartas.',
        initial_price: 100,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156849/w5mzohjsbgkqfwh2wvtp.png',
        categoryId: '66fa772a-195a-4006-819e-c37909a7674c',
        userId: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Estampilla Rara',
        description:
          'Estampilla de colección de la década de 1920, un artículo de gran valor histórico y filatélico, perfecto para coleccionistas serios.',
        initial_price: 200,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156848/vvcyh2mttfhgdgc8nphg.png',
        categoryId: '66fa772a-195a-4006-819e-c37909a7674c',
        userId: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Moneda Histórica',
        description:
          'Moneda de oro romana antigua, una pieza invaluable que representa una parte de la historia antigua, ideal para numismáticos.',
        initial_price: 500,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156854/rrbu4qec4lhtg2eps1v3.png',
        categoryId: '66fa772a-195a-4006-819e-c37909a7674c',
        userId: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Funko Pop',
        description:
          'Figura Funko Pop exclusiva de edición limitada, ideal para coleccionistas de cultura pop y figuras decorativas modernas.',
        initial_price: 15,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156852/avqs1txjudxkxthzqs61.png',
        categoryId: '66fa772a-195a-4006-819e-c37909a7674c',
        userId: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Figura de Acción',
        description:
          'Figura de acción de colección de Star Wars, con detalles precisos y alta calidad, imprescindible para fanáticos de la saga.',
        initial_price: 50,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156854/ch9jwqvwfhwe3t2bucu6.png',
        categoryId: '66fa772a-195a-4006-819e-c37909a7674c',
        userId: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Gadget',
        description:
          'Dispositivo electrónico innovador de última generación, ideal para entusiastas de la tecnología y primeros adoptadores.',
        initial_price: 100,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156853/jjpbopgz3kh6ron83syo.png',
        categoryId: 'a91e6862-3e44-4295-9173-5513d01e348c',
        userId: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Computadora',
        description:
          'Ordenador de edición limitada para gaming, con hardware de alta gama y diseño exclusivo para jugadores serios.',
        initial_price: 1000,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156855/luh4x6zqnzviczn5rfaq.png',
        categoryId: 'a91e6862-3e44-4295-9173-5513d01e348c',
        userId: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Smartphone',
        description:
          'Smartphone de colección con carcasa dorada, una pieza única que combina tecnología de vanguardia con un diseño lujoso.',
        initial_price: 800,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156855/hslsoizk2xxbuxoktbsy.png',
        categoryId: 'a91e6862-3e44-4295-9173-5513d01e348c',
        userId: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Auto Clásico',
        description:
          'Coche clásico restaurado de la década de 1960, con motor original y detalles auténticos, ideal para amantes de los vehículos históricos.',
        initial_price: 20000,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156855/thra4zxr9xruxrifzrhz.png',
        categoryId: '2860e8e3-6789-4275-a237-668922d08a92',
        userId: 'cf7785f5-e8e4-4214-b6d7-8a525b826a49',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Moto Antigua',
        description:
          'Motocicleta Harley Davidson de 1940, restaurada y en perfectas condiciones de funcionamiento, una joya para coleccionistas de motos clásicas.',
        initial_price: 10000,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156855/odhi8iihuqz3le7mxjqa.png',
        categoryId: '2860e8e3-6789-4275-a237-668922d08a92',
        userId: '46e6e7b2-63d0-4bb3-b2c1-e3618d1f9f26',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Bicicleta Vintage',
        description:
          'Bicicleta de carrera de los años 70, con marco original y componentes restaurados, ideal para ciclistas nostálgicos y coleccionistas.',
        initial_price: 500,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156857/hm6zclzwu3b9pghdosfs.png',
        categoryId: '2860e8e3-6789-4275-a237-668922d08a92',
        userId: '46e6e7b2-63d0-4bb3-b2c1-e3618d1f9f26',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Casa',
        description:
          'Casa colonial de principios del siglo XX, con arquitectura histórica y restauraciones cuidadosas, perfecta para quienes buscan una vivienda única.',
        initial_price: 100000,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156858/amqwt7onjcfwqdsjjmbl.png',
        categoryId: '15640257-4636-4241-87b1-0e5932269226',
        userId: '46e6e7b2-63d0-4bb3-b2c1-e3618d1f9f26',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Apartamento',
        description:
          'Apartamento moderno en el centro de la ciudad, con acabados de lujo y vistas impresionantes, ideal para quienes buscan comodidad urbana.',
        initial_price: 200000,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156858/kxypm9atewt4pvxmipzk.png',
        categoryId: '15640257-4636-4241-87b1-0e5932269226',
        userId: '46e6e7b2-63d0-4bb3-b2c1-e3618d1f9f26',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Terreno Urbano',
        description:
          'Terreno urbanizado listo para construir, ubicado en una zona estratégica con alto potencial de desarrollo, ideal para inversores.',
        initial_price: 50000,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156860/p4tuqc0ye7jidhpfrpfq.png',
        categoryId: '15640257-4636-4241-87b1-0e5932269226',
        userId: '46e6e7b2-63d0-4bb3-b2c1-e3618d1f9f26',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        name: 'Terreno Rural',
        description:
          'Terreno agrícola con vistas panorámicas, perfecto para proyectos de agricultura sostenible o desarrollo residencial en zonas tranquilas.',
        initial_price: 20000,
        image:
          'https://res.cloudinary.com/de1yhabdm/image/upload/v1718156860/kc1baazpetk8jthtz2pz.png',
        categoryId: '15640257-4636-4241-87b1-0e5932269226',
        userId: '46e6e7b2-63d0-4bb3-b2c1-e3618d1f9f26',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Products', products, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
