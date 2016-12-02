# AnimalId
ForestgreenSteepGalapagospenguin

# Usage

Because of the use of crypto for randomization generating names can take some time so promises are used.

```javascript
const aid = require('animalid');

aid.gen(3).then(id => {
  console.log(id); // ForestgreenSteepGalapagospenguin
});
```