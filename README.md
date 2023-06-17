# bacteria

```bash
npm install

npm run client
```

## What this game demonstrates

Robotic laboratories enable us to conduct online experiments:
one can readjust an experiment right in the middle of it based on the data gathered so far.
This allows us to conduct much more efficient experiments.

One of the tasks we solve at the laboratory --- optimization of bio-processes:
how and when to feed bacteria to achieve fast and healthy growth. 

This game lets you play the role of optimization algorithm: your goal is to cultivate as many bacteria as possible within
30 seconds (3 hours in real-time). Bacteria need glucose to grow, so you need to feed them by clicking the button "FEED".
But beware: in order to grow healthy bacteria also need oxygen (shown by the blue color of the medium) and,
when bacteria eat, they can consume a lot of oxygen very quickly! When there is no food, oxygen returns to normal levels.
When some glucose is present, but there is no oxygen in the reactor,
bacteria convert a part of glucose into acetate (shown by the green color of the medium).
When a large amount of acetate is present in the bioreactor, bacteria slow down their growth.
Be careful: do not feed too much, otherwise, bacteria will consume all oxygen and start generating acetate!

## How we do it in the laboratory

In real-life experiments, we employ algorithms to compute the optimal feeding profile: when and how much glucose to feed.
Algorithms use mathematical models (like the one this game is based on) to predict what happens when you feed bacteria,
then adjust the amount of glucose and the frequency of pulses to achieve the best growth.
One of the challenges we face is the unknown parameters of the model, for example, how much glucose a cell consumes,
how efficiently it converts glucose into biomass, and many others. These unknown parameters lead to uncertain predictions,
which means that to find the optimal feeding profile, one must also gather information about the cell.
Our algorithms observe bacteria under different conditions and then use this information to feed them properly.
