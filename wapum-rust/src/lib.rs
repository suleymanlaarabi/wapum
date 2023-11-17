mod utils;

use serde::{Deserialize, Serialize};
use serde_json::Result;
use chrono::{DateTime, Utc};
use itertools::Itertools; 

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}



#[derive(Debug, Serialize, Deserialize)]
struct MyStruct {
    id: u64,
    timestamp: String,
}

fn process_json(input_json: &str) -> Result<String> {
    let mut documents: Vec<MyStruct> = serde_json::from_str(input_json)?;

    let new_messages: Vec<MyStruct> = documents
        .into_iter()
        .map(|mut doc| {
            if DateTime::parse_from_rfc3339(&doc.timestamp).is_ok() {
                return doc;
            }

           
           
            doc.timestamp = Utc::now().to_rfc3339(); 

            doc
        })
        .collect();

    let messages: Vec<MyStruct> = new_messages
        .into_iter()
        .filter(|message| {
            new_messages
                .iter()
                .position(|m| m.id == message.id)
                == Some(new_messages.iter().position(|m| m.id == message.id).unwrap())
        })
        .collect();

    let sorted_messages = messages
        .into_iter()
        .sorted_by(|a, b| a.timestamp.cmp(&b.timestamp));

    let result_json = serde_json::to_string(&sorted_messages).expect("Serialization failed");

    Ok(result_json)
}

fn main() {
    let input_json = r#"
        [
            {"id": 1, "timestamp": "2023-11-18T12:34:56Z"},
            {"id": 2, "timestamp": "2023-11-18T13:45:00Z"},
            // ... autres objets ...
        ]
    "#;

    match process_json(input_json) {
        Ok(result) => {
            println!("{}", result);
        }
        Err(e) => {
            println!("Erreur de traitement JSON: {:?}", e);
        }
    }
}
