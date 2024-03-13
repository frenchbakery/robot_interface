from dataclasses import dataclass
from datetime import datetime

@dataclass
class ExecutionStruct:
    type: str
    data: ...
    timestamp: str = datetime.now().strftime('%Y-%m-%d %H:%M:%S') 

