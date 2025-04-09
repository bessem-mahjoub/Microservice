package com.document.entities;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import org.bson.types.Binary;

import java.io.IOException;

public class BinarySerializer extends StdSerializer<Binary> {

    public BinarySerializer() {
        this(null);
    }

    public BinarySerializer(Class<Binary> t) {
        super(t);
    }

    @Override
    public void serialize(Binary value, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeBinary(value.getData());
        gen.writeNumberField("type", value.getType());
        gen.writeEndObject();
    }

}