//node index add --name="Budi" --phone="0848484848" --email="mail@mail.com"
//node index list
//node index update --name="Budi" --phone="084"
//node index delete --name="Budi"
//node index detail --name="Budi"

import { jsonChecker } from "./utils/checkjson.js";
import { registerCommands } from "./routes/contactsRoutes.js";

jsonChecker();
registerCommands().parse();
