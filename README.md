# Mongodb Change Streams Node.js Example

This is demo project shows mongodb change streams change event bug.

## 1. listen to change twice:

```
    // listen to change twice
    changeStream.on("change", function(change) {
      console.log("change callback1");
    });

    changeStream.on("change", function(change) {
      console.log("change callback2");
    });
```

## 2. insert a doc

```
    // insert few data with timeout so that we can watch it happening
    setTimeout(function() {
      collection.insertOne({ batman: "bruce wayne" }, function(err) {
        assert.ifError(err);
      });
    }, 1000);
```

## 3. each change callback called forth

run `node index.js`, output:

```
change callback1
change callback2
change callback1
change callback2
```

expected behavior:

```
change callback1
change callback2
```
