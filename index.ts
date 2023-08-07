import express, { Express, Request, Response } from "express";
import { Permit } from "permitio";
import { executeGraphQLQuery } from "./gqlex";

const app = express();
const port = 8000;

const permit: Permit = new Permit({
  pdp: "https://cloudpdp.api.permit.io",
  token: "permit_key_QhCgXnSCutfzSZXbRAoHauXww7ynYxB55EcDNo6njhi42bWVxZioXuKYsv0oAF4BE2qqWawBQ5mv4tPtbvGXeJ"
});

app.get('/', (req: Request, res: Response) => {
  res.send("hellowwwss  ffff ddds");
});
app.get('/checkpermit', async (req: Request, res: Response) => {
  try {


    const permitUser = {
      key: "supunnilakshana@gmail.com",
      roles: [{ role: 'admin', tenant: 'default' }],
    };
    const email = "supusdinithi@gmail.com";
    const permitted = await permit.check(email, "hr-act", "hr-dep")
    if (permitted) {
      res.status(200).send(`is  PERMITTED to example action ( add actions to your resource to see here real data ) example resource ( add resources to your env to see here real data )!`);
    } else {
      res.status(403).send(`is  NOT PERMITTED to example action ( add actions to your resource to see here real data ) example resource ( add resources to your env to see here real data )!`);
    }

  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

//graph ql
app.get('/testgql', async (req: Request, res: Response) => {
  try {

    const query = `
      query getAnimal {
        Animal {
          id
          des
          name
        }
      }    
  `;
    const mutation = `
  mutation MyMutation($name:String!,$des:String!) {
    insert_Animal_one(object: {des: $des,  name:$name}) {
      id
    }
  }
   
`;

    const variable = {
      "des": "fgf",
      "name": "sdsd"

    }
    const data = await executeGraphQLQuery<{ users: { Animal: AnimalData[] } }>(mutation, variable);
    return res.send(data);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

interface AnimalData {
  id: number;
  name: string;
  des: string;

}

app.listen(port, () => console.log(`listening on http://localhost:${port}`));
