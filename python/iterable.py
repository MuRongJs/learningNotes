from collections import Iterable;

str = "this is string";
print(isinstance(str, Iterable));

for i, val in enumerate([1,2,3,4,5,6]):
    print(i, val);

def findMinAndMax(list):
  min = list[0]
  max = list[0]
  for val in list:
    if val > max:
      max = val
    if val < min:
      min = val
  return (min, max)

print(findMinAndMax([1,2,3,4,5,6,7,8,9]))

L1 = ['Hello', 'World', 18, 'Apple', None]

L2 = [x.lower() for x in L1 if isinstance(x, str)]
print(L2)
