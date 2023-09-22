// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json([
    {
      Bluebird: [
        {
          name: 'Bluebird Van',
          price: 'Rp41K-Rp49K',
          est: '2-3',
          person: 6
        },
        {
          name: 'Bluebird Fixed Price',
          price: 'Rp49.000',
          est: '2-3',
          person: 3
        }
      ]
    },
    {
      Silverbird: [
        {
          name: 'Bluebird Van',
          price: 'Rp75K-Rp90K',
          est: '2-3',
          person: 5
        }
      ]
    },
    {
      Goldenbird: [
        {
          name: 'Toyota Innova',
          price: 'Rp41K-Rp49K',
          est: '1 Hour',
          person: 6
        },
        {
          name: 'Bluebird Fixed Price',
          price: 'Rp49.000',
          est: '1 Hour',
          person: 3
        }
      ]
    }
  ])
}
