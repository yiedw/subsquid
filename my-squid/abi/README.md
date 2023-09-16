# ABI folder

This is a dedicated folder for ABI files. Place you contract ABI here and generate facade classes for type-safe decoding of the event, function data and contract state queries with

```sh
sqd typegen
```

This `typegen` command is defined in `commands.json`.


sqd generate \                    
--address 0x6B175474E89094C44Da98b954EedeAC495271d0F \
--archive eth-mainnet \
--event '*' \
--function '*' \
--from 1000000

