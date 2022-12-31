### equal

type Equal<X, Y> =
  (<T>() => T extends X ? 1 : 2) extends
  (<T>() => T extends Y ? 1 : 2) ? true : false

declare let aa: <T>() => (T extends string ? 1 : 2)

declare let bb: <T>() => (T extends number ? 1 : 2)
aa = bb //false

declare let aa1: <T>() => (T extends string ? 1 : 2)

declare let bb1: <T>() => (T extends string ? 1 : 2)
aa1 = bb1 //true

https://stackoverflow.com/questions/68961864/how-does-the-equals-work-in-typescript/68963796#68963796


### pick

type pick <T, U>{
  
}
