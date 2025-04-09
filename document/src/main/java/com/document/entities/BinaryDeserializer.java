package com.document.entities;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import org.bson.types.Binary;

import java.io.IOException;

public class BinaryDeserializer extends StdDeserializer<Binary> {

    public BinaryDeserializer() {
        this(null);
    }

    public BinaryDeserializer(Class<?> vc) {
        super(vc);
    }

    @Override
    public Binary deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        JsonNode node = p.getCodec().readTree(p);
        byte[] data = node.get("data").binaryValue();
        return new Binary(data);
    }

}